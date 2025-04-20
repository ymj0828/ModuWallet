import { useNavigate } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-10 flex items-center justify-center">
      <button
        onClick={() => navigate(-1)}
        className="text-black-to-white absolute left-0 flex items-center gap-1 text-base font-medium"
      >
        <ChevronLeft size={20} />
        이전
      </button>
      <h1 className="text-black-to-white text-[24px] font-bold">{title}</h1>
    </div>
  );
};

export default PageHeader;
