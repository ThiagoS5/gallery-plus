import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/atom/badge";
import Button from "./components/atom/button";
import Divider from "./components/atom/divider";
import Alert from "./components/molecules/alert";
import ButtonIcon from "./components/molecules/button-icon";
import InputText from "./components/molecules/input-text";
import SearchIcon from "./assets/icons/search.svg?react";
import InputCheckbox from "./components/molecules/input-checkbox";
import InputSingleFile from "./components/molecules/input-singlefile";

export default function App() {
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
			<div>
				<InputSingleFile />
			</div>
		</>
	);
}
