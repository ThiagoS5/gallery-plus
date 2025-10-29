import SelectCheckedBoxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Button from "../../../components/atom/button";
import InputText from "../../../components/atom/input-text";
import Skeleton from "../../../components/atom/skeleton";
import Text from "../../../components/atom/text";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/molecules/dialog";
import ImagePreview from "../../../components/molecules/image-preview";
import { MOCK_PHOTOS_LIST } from "../../../mocks/data";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import type { Photo } from "../../photos/models/photo";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function albumNewDialog({ trigger }: AlbumNewDialogProps) {
  // TODO: utilizar na api
  const isLoadingPhotos = false;
  const loading = isLoadingPhotos;
  const photos: Photo[] = MOCK_PHOTOS_LIST;

  function handleTogglePhoto(selected: boolean, photoId: string) {
    console.log(selected, photoId);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar Álbum</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" maxLength={155} />
          <div className="space-y-3">
            <Text as="div" variant="label-small">
              Fotos cadastradas
            </Text>
            {!loading && photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <PhotoImageSelectable
                    key={photo.id}
                    src={`/images/${photo.imageId}`}
                    title={photo.title}
                    imageClassName="w-20 h-20"
                    onSelectImage={(selected) =>
                      handleTogglePhoto(selected, photo.id)
                    }
                  />
                  // <ImagePreview
                  //   key={photo.id}
                  //   src={`/images/${photo.imageId}`}
                  //   title={photo.title}
                  //   className="w-20 h-20"
                  // />
                ))}
              </div>
            )}
            {loading && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={`photo-loading-${index}`}
                    className="w-20 h-20 rounded-lg"
                  />
                ))}
              </div>
            )}
            {!loading && photos.length === 0 && (
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <SelectCheckedBoxIllustration />
                <Text variant="paragraph-medium" className="text-center">
                  Nenhuma foto disponível para seleção
                </Text>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
