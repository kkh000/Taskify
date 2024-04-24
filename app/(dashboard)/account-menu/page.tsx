'use client';
import ChangePassword from '@/components/MyDashBoard Page/accountMenu/ChangePassword';
import EditProfile from '@/components/MyDashBoard Page/accountMenu/EditProfile';
import Link from 'next/link';
import Image from 'next/image';

const AccountMenu = () => {
  return (
    <>
      <Link href='/boardid'>
        <button type='button' className='text-base text-tp-black_700 flex gap-1.5 items-center mb-6'>
          <div className='w-5 h-5 relative'>
            <Image fill src='/icon/arrow_forward.svg' alt='뒤로 가기 버튼' />
          </div>
          돌아가기
        </button>
      </Link>
      <div className='flex flex-col gap-5'>
        <EditProfile />
        <ChangePassword />
      </div>
    </>
  );
};

export default AccountMenu;