import useFirestore from "@/hooks/useFirestore";
import { NextPage } from "next";
import { Icon } from "@iconify/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  :hover {
    background-color: #f1f1f1;
  }
`;

const DropdownItemLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  :hover {
    background-color: #f1f1f1;
  }
`;

interface Props {}

const Navbar: NextPage<Props> = () => {
  const { HasStore, user, signOutAction } = useFirestore();
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between bg-yellow-500 px-5 py-2">
        <div
          className="flex cursor-pointer items-center gap-2 text-2xl font-bold text-white"
          onClick={() => router.push("/")}
        >
          <Icon icon="ic:round-fastfood" className="hidden text-2xl md:block" /> Bee Shop
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1 text-white">
            <div className="dropdown-c">
              <div className="flex gap-2">
                {user && <span>{user.email}</span>}
                {user ? (
                  <Icon icon="ic:baseline-account-circle" className="text-xl" />
                ) : (
                  <button
                    onClick={() => router.push("/sign-in")}
                    className="btn-ghost btn-sm btn flex items-center gap-2"
                  >
                    SignIn
                    <Icon icon="ic:baseline-log-in" className="text-xl" />
                  </button>
                )}
              </div>
              {user && (
                <div className="dropdown-content-c rounded">
                  <div className="flex flex-col text-black">
                    <DropdownItemLink href="/my-account">
                      <Icon icon="material-symbols:account-circle-outline" className="mr-2" />
                      บัญชีของฉัน
                    </DropdownItemLink>
                    {HasStore !== undefined && (
                      <>
                        {HasStore ? (
                          <DropdownItemLink href="/my-store">
                            <Icon icon="material-symbols:storefront-outline" className="mr-2" />
                            ร้านของฉัน
                          </DropdownItemLink>
                        ) : (
                          <DropdownItemLink href="/my-store">
                            <Icon icon="material-symbols:add" className="mr-2" />
                            สร้างร้าน
                          </DropdownItemLink>
                        )}
                        {HasStore && (
                          <DropdownItemLink href="/store-management">
                            <Icon icon="ic:baseline-fastfood" className="mr-2" />
                            จัดการสินค้า
                          </DropdownItemLink>
                        )}
                      </>
                    )}

                    <DropdownItem className="text-red-500" onClick={signOutAction}>
                      <Icon icon="ic:baseline-logout" className="mr-2" />
                      ออกจากระบบ
                    </DropdownItem>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
