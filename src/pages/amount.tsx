import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AmountSelector from '@/components/amount/AmountSelector';
import PasswordBottomSheet from '@/components/amount/PasswordBottomSheet';
import BaseButton from '@/components/common/BaseButton';
import PageHeader from '@/components/common/PageHeader';
import { useAmountTransfer } from '@/hooks/useAmountTransfer';
import { useAuth } from '@/hooks/useAuth';
import { getUserInfo, isTransferPasswordValid } from '@/services/user.service';

const AmountPage = () => {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toUid = params.get('toUid');

  const [toName, setToName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!toUid) return;
    getUserInfo(toUid).then((userInfo) => setToName(userInfo?.name ?? '(이름 없음)'));
  }, [toUid]);

  const { balance, amount, error, submit, handleInputChange, handleAddAmount } =
    useAmountTransfer(user?.uid, toUid, toName);

  const handleTransfer = () => {
    setAuthError('');
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!user?.uid) return;
    const isValid = await isTransferPasswordValid(user.uid, password);
    if (!isValid) {
      setAuthError('비밀번호가 일치하지 않습니다.');
      return;
    }

    await submit();
    navigate('/send/complete');
  };

  return (
    <>
      <PageHeader title="계좌 이체" />
      <p className="text-black-to-white mb-[20px] text-[30px] font-bold">
        {toName}님께 얼마를 보낼까요?
      </p>

      <AmountSelector
        balance={balance}
        amount={amount}
        onAddAmount={handleAddAmount}
        onInputChange={handleInputChange}
        error={error}
      />
      <BaseButton
        size="full"
        disabled={amount === '' || amount === '0'}
        onClick={handleTransfer}
      >
        이체하기
      </BaseButton>

      <PasswordBottomSheet
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        error={authError}
      />
    </>
  );
};

export default AmountPage;
