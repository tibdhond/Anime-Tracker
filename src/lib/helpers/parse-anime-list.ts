import {GetAiringListQuery, GetAnimeListQuery} from "@/lib/api/__gen__/graphql";
import {Anime} from "@/lib/entities/classes/anime";
import {millisecondsToHumanReadable, truncate} from "@/lib/helpers/util";
import {SEASON_CUTOFF} from "@/lib/entities/consts";
import {AnimeElement, AnimeList, AnimeMedia, AnimeNotes, InvertedMediaItem, StatusClass} from "@/lib/entities/types";


export function parseAnimeList(animeQueryResult: GetAnimeListQuery): Anime[] {
    const animeList: AnimeList | null = animeQueryResult.Page?.mediaList ?? null;

    if (!animeList) {
        return []
    }

    return animeList.reduce((acc: Anime[], animeElement: AnimeElement | null) => {
        if (animeElement) {
            acc.push(processSingleAnime(animeElement));
        }
        return acc;
    }, []);
}

export function parseAiring(airingQueryResult: GetAiringListQuery): Anime[] {
    return airingQueryResult.Page?.media?.filter(media => media && media?.mediaListEntry?.status === 'PLANNING').map(mediaItem => processSingleAnime(invertMediaItem(mediaItem!))) ?? [];
}

function invertMediaItem(mediaItem: InvertedMediaItem): AnimeElement  {
    const { mediaListEntry, ...media } = mediaItem;
    return {
        ...mediaListEntry!,
        media,
    };
}

function processSingleAnime(mediaListItem: AnimeElement) {
    const info: AnimeMedia = mediaListItem.media!;
    const notes: AnimeNotes = mediaListItem.notes ? JSON.parse(mediaListItem.notes) : {};
    let nextMsg: string = 'Unknown';
    let nextTooltip: string = '';
    let updateStatus: string = 'Unknown';
    let updateClass: StatusClass = 'unknown';
    let latestEp: number | null = info.status === 'FINISHED' ? info.episodes : null;
    let air: number = 0;
    let isCurrent: boolean = true;
    const offset: number | null = notes.offset ?? null;
    const now: Date = new Date();

    if (info.nextAiringEpisode) {
        latestEp = info.nextAiringEpisode.episode - 1;
        if (offset && info.nextAiringEpisode.timeUntilAiring < 604800 && 604800 - info.nextAiringEpisode.timeUntilAiring < offset * 60 * 60) {
            latestEp--;
        }
    }
    if (!latestEp || latestEp === mediaListItem.progress) {
        updateStatus = 'Up-to-date';
        updateClass = 'upToDate';
        latestEp = mediaListItem.progress;
    } else {
        const epsBehind = Math.max(0, latestEp - mediaListItem.progress!);
        updateStatus = `${epsBehind} behind`;
        updateClass = 'notUpToDate';
    }
    if (info.status !== 'FINISHED' && info.nextAiringEpisode) {
        let diff: number = info.nextAiringEpisode.timeUntilAiring;
        if (offset) {
            diff = diff + offset * 60 * 60;
            if (info.nextAiringEpisode.timeUntilAiring < 604800) {
                diff = diff % 604800;
            }
        }
        air = diff;
        const delta = millisecondsToHumanReadable(diff);
        nextMsg = `Next: ${delta.days}d ${delta.hours}h ${delta.minutes}min`;
        const timeString = new Date(new Date().getTime() + info.nextAiringEpisode.timeUntilAiring * 1000).toString();
        nextTooltip = timeString.slice(0, timeString.lastIndexOf(':'));
    } else if (info.status === 'FINISHED') {
        nextMsg = 'Finished';
        const endDate: Date = new Date(info.endDate?.year ?? now.getFullYear(), info.endDate?.month ?? now.getMonth());

        if (now.getTime() - endDate.getTime() < SEASON_CUTOFF) {
            const archiveDate = new Date(endDate.getTime() + SEASON_CUTOFF);
            const delta = millisecondsToHumanReadable((archiveDate.getTime() - now.getTime()) / 1000);
            nextTooltip = `Archived in: ${delta.days}d ${delta.hours}h ${delta.minutes}m`;
        } else {
            isCurrent = false;
        }
    }

    return new Anime({
        title: truncate(info.title?.userPreferred ?? 'Title not found', 40),
        titleFull: info.title?.userPreferred ?? 'Title not found',
        id: info.id,
        idMal: info.idMal,
        entryId: mediaListItem.id,
        nextMsg: nextMsg,
        nextTooltip: nextTooltip,
        updateStatus: updateStatus,
        updateClass: updateClass,
        behind: (latestEp ?? 0) - (mediaListItem.progress ?? 0),
        air: air,
        img: info.coverImage?.medium ?? null,
        ep: mediaListItem.progress ?? 0,
        status: info.status ?? "UNKNOWN",
        isCurrent: isCurrent,
        notes: notes,
        nextAiringEpisode: info.nextAiringEpisode,
        offset: offset,
        updatedAt: mediaListItem.updatedAt,
    });
}