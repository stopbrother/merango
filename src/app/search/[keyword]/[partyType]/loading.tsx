import Spinner from '@/components/ui/spinner';

const loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Spinner size={40} />
    </div>
  );
};

export default loading;
