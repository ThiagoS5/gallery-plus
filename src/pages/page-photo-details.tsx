import { useParams } from "react-router";
import Button from "../components/atom/button";
import Container from "../components/atom/container";
import Skeleton from "../components/atom/skeleton";
import Text from "../components/atom/text";
import ImagePreview from "../components/molecules/image-preview";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import type { Photo } from "../contexts/photos/models/photo";
import { MOCK_ALBUMS_LIST } from "../mocks/data";

export default function PagePhotoDetails() {
  const { id } = useParams();

  //teste mock
  const isLoadingPhoto = false;
  const photo = {
    id: "1",
    title: "Pôr do sol na praia",
    imageId: "portrait-tower.png",
    albums: [
      { id: "1", title: "tree" },
      { id: "a2", title: "Paisagens" },
    ],
  } as Photo;
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
        <PhotosNavigator />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`/images/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          {!isLoadingPhoto ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>
        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumsListSelectable photo={photo} albums={MOCK_ALBUMS_LIST} />
        </div>
      </div>
    </Container>
  );
}
