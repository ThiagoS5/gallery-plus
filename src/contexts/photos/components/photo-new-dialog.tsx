import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/atom/button";
import InputText from "../../../components/atom/input-text";
import Skeleton from "../../../components/atom/skeleton";
import Text from "../../../components/atom/text";
import Alert from "../../../components/molecules/alert";
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
import InputSingleFile from "../../../components/molecules/input-single-file";
import useAlbums from "../../albums/hooks/use-albums";
import usePhoto from "../hooks/use-photo";
import { type PhotoNewFormSchema, photoNewFormSchema } from "../schemas";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function photoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { albums, isLoadingAlbums } = useAlbums();
  const { createPhoto } = usePhoto();
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();
  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
  const albumsIds = form.watch("albumsIds");

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleToggleAlbum(albumId: string) {
    const albumsId = form.getValues("albumsIds") || [];
    const albumsSet = new Set(albumsId);
    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
    }
    form.setValue("albumsIds", Array.from(albumsSet));
  }

  function handleSubmit(payload: PhotoNewFormSchema) {
    setIsCreatingPhoto(async () => {
      await createPhoto(payload);
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar foto</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert>
              Tamanho máximo 50mb
              <br />
              Você pode selecionar arquivo em PNG, JPG ou JPEG
            </Alert>
            <InputSingleFile
              form={form}
              allowedExtensions={["png", "jpg", "jpeg"]}
              maxFileSizeInMB={50}
              replaceBy={
                <ImagePreview className="w-full h-56" src={fileSource} />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />
            <div className="space-y-3">
              <Text variant="label-small">Selecionar álbuns</Text>
              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      onClick={() => handleToggleAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}
                {isLoadingAlbums &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={`album-loading-${index}`}
                      className="h-7 w-20"
                    />
                  ))}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingPhoto}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreatingPhoto}
              handling={isCreatingPhoto}
            >
              {isCreatingPhoto ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
