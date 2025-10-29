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
import type { Album } from "../../albums/models/album";

interface PhotoNewDialog {
  trigger: React.ReactNode;
}

export default function photoNewDialog({ trigger }: PhotoNewDialog) {
  const form = useForm();
  // TODO: mock
  const isLoadingAlbum = false;
  const loading = isLoadingAlbum;
  const mockAlbum: Album[] = [
    { id: "1", title: "tree" },
    { id: "a2", title: "Paisagens" },
  ];
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar foto</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" maxLength={255} />
          <Alert>
            Tamanho máximo 50mb
            <br />
            Você pode selecionar arquivo em PNG, JPG ou JPEG
          </Alert>
          <InputSingleFile
            form={form}
            allowedExtensions={["png", "jpg", "jpeg"]}
            maxFileSizeInMB={50}
            replaceBy={<ImagePreview className="w-full h-56" />}
          />
          <div className="space-y-3">
            <Text variant="label-small">Selecionar álbuns</Text>
            {!loading &&
              mockAlbum.length > 0 &&
              mockAlbum.map((album) => (
                <Button
                  key={album.id}
                  variant="ghost"
                  size="sm"
                  className="truncate"
                ></Button>
              ))}
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Skeleton className="h-7 w-20" key={`album-loading-${index}`} />
              ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
            <Button>Adicionar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
