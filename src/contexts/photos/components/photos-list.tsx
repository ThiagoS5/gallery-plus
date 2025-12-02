import ImageIcon from "../../../assets/icons/image.svg?react";
import Icon from "../../../components/atom/icon";
import Text from "../../../components/atom/text";
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";

interface PhotosListProps {
  photos: Photo[];
  loading?: boolean;
}

export default function PhotosList({ photos, loading }: PhotosListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 justify-items-center gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {!loading &&
          photos.length > 0 &&
          photos.map((photo) => <PhotoWidget key={photo.id} photo={photo} />)}
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              // biome-ignore lint/suspicious/noArrayIndexKey: false positive
              key={`photo-loading-${index}`}
              photo={{} as Photo}
              loading
            />
          ))}
      </div>
      {!loading && photos.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-10 text-white">
          <Icon svg={ImageIcon} className="w-16 h-16 fill-current" />
          <Text>Nenhuma foto encontrada</Text>
        </div>
      )}
    </div>
  );
}
