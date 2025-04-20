import PageHeader from '@/components/common/PageHeader';
import SendUserList from '@/components/send/SendUserList';

const SendPage = () => {
  return (
    <div>
      <PageHeader title="계좌 이체" />
      <p className="text-[32px] font-bold">누구에게 보낼까요?</p>
      <hr className="my-[32px] border-black" />
      <SendUserList />
    </div>
  );
};

export default SendPage;
