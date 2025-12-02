import cx from "classnames";
import Button from "../../../components/atom/button";
import Skeleton from "../../../components/atom/skeleton";
import Text from "../../../components/atom/text";
import usePhotos from "../../photos/hooks/use-photos";
import type { Album } from "../models/album";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}
export default function AlbumsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumsFilterProps) {
  const { filters } = usePhotos();

  return (
    <div
      className={cx(
        "flex flex-col sm:flex-row items-center sm:items-center gap-3.5",
        className,
      )}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex flex-wrap justify-center gap-3">
        {!loading ? (
          <>
            <Button
              variant={filters.albumId === null ? "primary" : "ghost"}
              size="sm"
              className="cursor-pointer"
              onClick={() => filters.setAlbumId(null)}
            >
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                variant={filters.albumId === album.id ? "primary" : "ghost"}
                size="sm"
                className="cursor-pointer"
                onClick={() => filters.setAlbumId(album.id)}
              >
                <Text>{album.title}</Text>
              </Button>
            ))}
          </>
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              //biome-ignore lint/suspicious/noArrayIndexKey: false positive
              key={`album-button-loading-${index}`}
              className="w-28 h-7"
            ></Skeleton>
          ))
        )}
      </div>
    </div>
  );
}
