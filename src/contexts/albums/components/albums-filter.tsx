import cx from "classnames";
import type { Album } from "../models/album";
import Button from "../../../components/atom/button";
import Skeleton from "../../../components/atom/skeleton";
import Text from "../../../components/atom/text";

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
  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button variant="primary" size="sm" className="cursor-pointer">
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
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
