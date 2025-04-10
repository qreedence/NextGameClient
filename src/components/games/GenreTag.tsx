interface GenreTagProps {
  genre: string;
}

const GenreTag = ({ genre }: GenreTagProps) => {
  return (
    <div className="flex justify-center items-center gap-2 py-1 px-2 cursor-pointer border-accent border-2 rounded-md hover:bg-primary">
      {genre}
    </div>
  );
};

export default GenreTag;
