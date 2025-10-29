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
      <div className="grid grid-cols-5 gap-9">
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
        <div>
          {" "}
          <Text>Nenhuma foto encontrada</Text>{" "}
        </div>
      )}
    </div>
  );
}
