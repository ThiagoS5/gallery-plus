import cx from "classnames";
import { Link, useLocation } from "react-router";
import Logo from "../../assets/images/galeria-plus-full-logo.svg?react";
import AlbumNewDialog from "../../contexts/albums/components/album-new-dialog";
import PhotoNewDialog from "../../contexts/photos/components/photo-new-dialog";
import PhotosSearch from "../../contexts/photos/components/photos-search";
import Button from "../atom/button";
import Container from "../atom/container";

interface MainHeaderProps extends React.ComponentProps<typeof Container> {}
export default function MainHeader({ className, ...props }: MainHeaderProps) {
  const { pathname } = useLocation();

  return (
    <Container
      as="header"
      className={cx(
        "flex flex-col md:flex-row justify-between items-center gap-4",
        className
      )}
      {...props}
    >
      <div className="w-full flex justify-between items-center md:hidden">
        <Link to="/">
          <Logo className="h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <PhotoNewDialog trigger={<Button size="sm">Nova foto</Button>} />
          <AlbumNewDialog
            trigger={
              <Button size="sm" variant="secondary">
                Criar álbum
              </Button>
            }
          />
        </div>
      </div>
      <div className="w-full md:hidden">
        {pathname === "/" && <PhotosSearch />}
      </div>
      <div className="hidden md:flex w-full justify-between items-center gap-10">
        <Link to="/">
          <Logo className="h-5" />
        </Link>
        {pathname === "/" && <PhotosSearch />}
        <div className="flex items-center gap-3">
          <PhotoNewDialog trigger={<Button size="md">Nova foto</Button>} />
          <AlbumNewDialog
            trigger={
              <Button size="md" variant="secondary">
                Criar álbum
              </Button>
            }
          />
        </div>
      </div>
    </Container>
  );
}
