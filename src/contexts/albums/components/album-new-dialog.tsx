import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";
import useAlbum from "../hooks/use-album";
import { type AlbumNewFormSchema, albumNewFormSchema } from "../schemas";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function albumNewDialog({ trigger }: AlbumNewDialogProps) {
  const { photos, isLoadingPhotos } = usePhotos();
  const { createAlbum } = useAlbum();
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
  });

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photosIds") || [];
    if (selected) {
      form.setValue("photosIds", [...photosIds, photoId]);
    } else {
      form.setValue(
        "photosIds",
        photosIds.filter((id) => id !== photoId)
      );
    }
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload);
      setModalOpen(false);
    });
  }
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar Álbum</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              aria-label="Título do álbum"
              placeholder="Adicione um título"
              maxLength={155}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <div className="space-y-3">
              <Text as="div" variant="label-small">
                Fotos cadastradas
              </Text>
              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${
                        photo.imageId
                      }`}
                      title={photo.title}
                      imageClassName="w-20 h-20"
                      onSelectImage={(selected) =>
                        handleTogglePhoto(selected, photo.id)
                      }
                    />
                  ))}
                </div>
              )}
              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      // biome-ignore lint/suspicious/noArrayIndexKey: The list is static and will not be reordered.
                      key={`photo-loading-${index}`}
                      className="w-20 h-20 rounded-lg"
                    />
                  ))}
                </div>
              )}
              {!isLoadingPhotos && photos.length === 0 && (
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
              <Button variant="secondary" disabled={isCreatingAlbum}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
            >
              {isCreatingAlbum ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
