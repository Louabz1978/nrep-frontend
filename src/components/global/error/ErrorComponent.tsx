function ErrorComponent({ error }: { error?: any }) {
  console.log(error);
  return (
    <div className="col-span-full flex-1">
      <div className="w-full h-full flex justify-center items-center text-red-400">
        An error happend
      </div>
    </div>
  );
}

export default ErrorComponent;
