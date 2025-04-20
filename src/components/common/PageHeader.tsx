import { useNavigate } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center relative mb-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-base font-medium text-gray-800 absolute left-0"
      >
        <ChevronLeft size={20} />
        이전
      </button>
      <h1 className="text-[24px] font-bold text-black">{title}</h1>
    </div>
  );
};

export default PageHeader;
