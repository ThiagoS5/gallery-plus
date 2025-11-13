import Divider from "../../../components/atom/divider";
import Skeleton from "../../../components/atom/skeleton";
import Text from "../../../components/atom/text";
import InputCheckbox from "../../../components/molecules/input-checkbox";
import type { Photo } from "../../photos/models/photo";
import type { Album } from "../models/album";

interface AlbumsListSelectable {
  loading?: boolean;
  albums: Album[];
  photo: Photo;
}
export default function albumsListSelectable({
  albums,
  photo,
  loading,
}: AlbumsListSelectable) {
  function isChecked(albumId: string) {
    return photo?.albums.some((album) => album.id === albumId);
  }
  function handlePhotoOnAlbums(albumId: string) {
    let albumsIds = [];

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id);
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId];
    }
    console.log("albums para o backend:", albumsIds);
  }
  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        albums?.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text variant="paragraph-large" className="truncate">
                {album.title}
              </Text>
              <InputCheckbox
                defaultChecked={isChecked(album.id)}
                onChange={() => handlePhotoOnAlbums(album.id)}
              />
            </div>
            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={`albums-list-${index}`}>
            <Skeleton className="h-[2.5rem]"></Skeleton>
          </li>
        ))}
    </ul>
  );
}
