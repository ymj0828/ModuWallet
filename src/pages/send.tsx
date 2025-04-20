import PageHeader from '@/components/common/PageHeader';
import SendUserList from '@/components/send/SendUserList';

const SendPage = () => {
  return (
    <div>
      <PageHeader title="계좌 이체" />
      <p className="text-black-to-white text-[32px] font-bold">누구에게 보낼까요?</p>
      <hr className="border-black-to-white my-[32px]" />
      <SendUserList />
    </div>
  );
};

export default SendPage;
