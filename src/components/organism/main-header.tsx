import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { Link, useLocation } from "react-router";
import Logo from "../../assets/images/galeria-plus-full-logo.svg?react";
import AlbumNewDialog from "../../contexts/albums/components/album-new-dialog";
import type { Photo } from "../../contexts/photos/models/photo";
import PhotoNewDialog from "../../contexts/photos/components/photo-new-dialog";
import PhotosSearch from "../../contexts/photos/components/photos-search";
import { fetcher } from "../../helpers/api";
import Button from "../atom/button";
import Container from "../atom/container";

interface MainHeaderProps extends React.ComponentProps<typeof Container> {}
export default function MainHeader({ className, ...props }: MainHeaderProps) {
  const { pathname } = useLocation();

  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["photos"],
    queryFn: () => fetcher("/photos"),
  });

  const showSearch =
    pathname === "/" && (isLoading || !photos || photos.length > 0);

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
        <Link to="/" aria-label="Página inicial">
          <Logo className="h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <PhotoNewDialog
            trigger={
              <Button size="sm" aria-label="Adicionar nova foto">
                Nova foto
              </Button>
            }
          />
          <AlbumNewDialog
            trigger={
              <Button
                size="sm"
                variant="secondary"
                aria-label="Criar novo álbum"
              >
                Criar álbum
              </Button>
            }
          />
        </div>
      </div>
      <div className="w-full md:hidden">
        {showSearch && <PhotosSearch />}
      </div>
      <div className="hidden md:flex w-full justify-between items-center gap-10">
        <Link to="/" aria-label="Página inicial">
          <Logo className="h-5" />
        </Link>
        {showSearch && <PhotosSearch />}
        <div className="flex items-center gap-3">
          <PhotoNewDialog
            trigger={
              <Button size="md" aria-label="Adicionar nova foto">
                Nova foto
              </Button>
            }
          />
          <AlbumNewDialog
            trigger={
              <Button
                size="md"
                variant="secondary"
                aria-label="Criar novo álbum"
              >
                Criar álbum
              </Button>
            }
          />
        </div>
      </div>
    </Container>
  );
}
