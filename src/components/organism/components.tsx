import { useForm } from "react-hook-form";
import ChevronLeftIcon from "../../assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import Badge from "../atom/badge";
import Button from "../atom/button";
import Divider from "../atom/divider";
import InputText from "../atom/input-text";
import Text from "../atom/text";
import Alert from "../molecules/alert";
import ButtonIcon from "../molecules/button-icon";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../molecules/dialog";
import ImagePreview from "../molecules/image-preview";
import InputCheckbox from "../molecules/input-checkbox";
import InputSingleFile from "../molecules/input-single-file";

export default function Components() {
  const form = useForm();
  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
  return (
    <>
      <div className="grid gap-7 p-6">
        <div className="flex gap-3">
          <Button>Button</Button>
          <Button variant="secondary">Button</Button>
          <Button disabled>Button</Button>
          <Button handling>Loading</Button>
          <Button icon={ChevronRightIcon}>Próxima Imagem</Button>
          <Button variant="ghost" size="sm">
            Button
          </Button>
          <Button variant="primary" size="sm">
            Button
          </Button>
        </div>

        <div className="flex gap-3">
          <ButtonIcon icon={ChevronLeftIcon} />
          <ButtonIcon icon={ChevronRightIcon} variant="secondary" />
        </div>

        <div className="flex gap-3">
          <Badge>Todos</Badge>
          <Badge>Natureza</Badge>
          <Badge>Viagem</Badge>
          <Badge loading>Viagem</Badge>
          <Badge loading>Viagem</Badge>
          <Badge loading>Viagem</Badge>
        </div>

        <div>
          <Alert>
            Tamanho máximo: 50MB
            <br />
            Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
          </Alert>
        </div>

        <div>
          <Divider />
        </div>
      </div>

      <div>
        <InputText icon={SearchIcon} placeholder="texto" />
      </div>

      <div>
        <InputCheckbox />
      </div>
      <div></div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button> Abrir modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Title da Modal</DialogHeader>
            <DialogBody>
              <Text>Conteúdo da modal</Text>
              <InputSingleFile
                form={form}
                allowedExtensions={["png", "jpg", "jpeg", "webp"]}
                maxFileSizeInMB={50}
                replaceBy={<ImagePreview src={fileSource} alt="imagem" />}
                {...form.register("file")}
              />
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
