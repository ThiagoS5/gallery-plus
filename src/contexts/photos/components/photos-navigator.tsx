import cx from "classnames";
import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react";
import Button from "../../../components/atom/button";
import Skeleton from "../../../components/atom/skeleton";
import ButtonIcon from "../../../components/molecules/button-icon";

interface photosNavigatorProps extends React.ComponentProps<"div"> {
  previousPhotoId?: string;
  nextPhotoId?: string;
  loading?: boolean;
}

export default function PhotosNavigator({
  previousPhotoId,
  nextPhotoId,
  loading,
  className,
  ...props
}: photosNavigatorProps) {
  const navigate = useNavigate();
  return (
    <div className={cx("flex gap-2", className)} {...props}>
      {!loading ? (
        <>
          <ButtonIcon
            aria-label="Imagem anterior"
            icon={ArrowLeftIcon}
            variant="secondary"
            disabled={!previousPhotoId}
            onClick={() => {
              navigate(`/fotos/${previousPhotoId}`);
            }}
          />
          <Button
            variant="secondary"
            icon={ArrowRightIcon}
            disabled={!nextPhotoId}
            onClick={() => {
              navigate(`/fotos/${nextPhotoId}`);
            }}
          >
            Próxima imagem
          </Button>
        </>
      ) : (
        <>
          <Skeleton className="h10 w-10"></Skeleton>
          <Skeleton className="h10 w-20"></Skeleton>
        </>
      )}
    </div>
  );
}
