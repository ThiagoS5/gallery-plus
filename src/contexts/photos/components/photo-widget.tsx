import { Link } from "react-router";
import Badge from "../../../components/atom/badge";
import { buttonVariants } from "../../../components/atom/button";
import Skeleton from "../../../components/atom/skeleton";
import Text from "../../../components/atom/text";
import ImagePreview from "../../../components/molecules/image-preview";
import type { Photo } from "../models/photo";

interface PhotoWidgetProps {
  photo: Photo;
  loading?: boolean;
}
export default function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
  return (
    <div className="flex flex-col gap-4 w-[10.875rem]">
      {!loading ? (
        <ImagePreview
          src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
          title={photo.title}
          imageClassName="w-[10.875rem] h-[10.875rem] rounded-lg"
        />
      ) : (
        <Skeleton className="w-[10.875rem] h-[10.875rem] rounded-lg" />
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large">{photo.title}</Text>
        ) : (
          <Skeleton className="w-full h-6" />
        )}

        <div className="flex gap-1 min-h-[1.375rem]">
          {!loading ? (
            <>
              {photo.albums.slice(0, 1).map((album) => (
                <Badge className="truncate" size="xs" key={album.id}>
                  {album.title}
                </Badge>
              ))}
              {photo.albums.length > 1 && (
                <Badge size="xs">+{photo.albums.length - 1}</Badge>
              )}
            </>
          ) : (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                key={`album-loading-${index}`}
                className="w-full h-4 rounded-sm"
              />
            ))
          )}
        </div>
      </div>
      {!loading ? (
        <Link
          to={`/fotos/${photo.id}`}
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
        >
          <Text
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "whitespace-nowrap",
            })}
          >
            Detalhes da imagem
          </Text>
        </Link>
      ) : (
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
}
