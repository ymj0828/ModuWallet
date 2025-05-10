import { useNavigate } from 'react-router-dom';

import BaseButton from '@/components/common/BaseButton';

const CompletePage = () => {
  const navigate = useNavigate();

  const raw = localStorage.getItem('lastTransfer');
  const info = raw ? JSON.parse(raw) : null;

  const { toName, amount, timestamp } = info;

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-black-to-white mb-16 mt-4 text-center text-[28px] font-bold">
        ✅ 이체 완료
      </h2>
      <ul className="text-black-to-white mx-auto mb-16 flex w-[400px] flex-col gap-7 text-lg">
        <li>
          <p className="mb-2 text-[22px] font-semibold">받는 분</p>
          <p className="text-[20px]">{toName}</p>
        </li>
        <li>
          <p className="mb-2 text-[22px] font-semibold">보낸 금액</p>
          <p className="text-[20px]">{Number(amount).toLocaleString()}원</p>
        </li>
        <li>
          <p className="mb-2 text-[22px] font-semibold">거래일시</p>
          <p className="text-[20px]">{new Date(timestamp).toLocaleString('ko-KR')}</p>
        </li>
      </ul>
      <div className="flex gap-3">
        <BaseButton
          size="full"
          onClick={() => {
            // localStorage.removeItem('lastTransfer');
            navigate('/');
          }}
        >
          처음 화면으로 가기
        </BaseButton>
        <BaseButton
          size="full"
          onClick={() => {
            // localStorage.removeItem('lastTransfer');
            navigate('/history');
          }}
        >
          거래 내역 보러가기
        </BaseButton>
      </div>
    </div>
  );
};

export default CompletePage;
