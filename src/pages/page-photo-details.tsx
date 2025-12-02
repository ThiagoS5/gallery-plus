import { useTransition } from "react";
import { useParams } from "react-router";
import Button from "../components/atom/button";
import Container from "../components/atom/container";
import Skeleton from "../components/atom/skeleton";
import Text from "../components/atom/text";
import ImagePreview from "../components/molecules/image-preview";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import usePhoto from "../contexts/photos/hooks/use-photo";
import type { Photo } from "../contexts/photos/models/photo";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const { photo, isLoadingPhoto, nextPhotoId, previousPhotoId, deletePhoto } =
    usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();
  const [isDeletingPhoto, setIsDeletingPhoto] = useTransition();

  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      await deletePhoto(photo?.id);
    });
  }
  if (!isLoadingPhoto && !photo) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Text variant="heading-large">Foto não encontrada</Text>
      </div>
    );
  }
  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotosNavigator
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
          loading={isLoadingPhoto}
        />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isLoadingPhoto ? (
            <Button
              variant="destructive"
              onClick={handleDeletePhoto}
              disabled={isDeletingPhoto}
            >
              {isDeletingPhoto ? "excluindo" : "excluir"}
            </Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>
        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumsListSelectable
            photo={photo as Photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>
    </Container>
  );
}
