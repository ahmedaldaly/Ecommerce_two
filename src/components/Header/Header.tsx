"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "motion/react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { IoMdSettings } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CgLogOut, CgProductHunt } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineStoreMallDirectory } from "react-icons/md";

import cookie from "js-cookie";
import { BiCategory, BiUser } from "react-icons/bi";
import { GiBrandyBottle } from "react-icons/gi";
type FormData = {
  email: string;
  password: string;
};
type user = {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isTrader: boolean;
  image: {
    url: string;
  };
};
const Header = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [loading, setloading] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const [traderMenu, setTraderMenu] = useState(false);

  const [user, setUser] = useState<user>();
  const pathname = usePathname();
  const token = cookie.get("userToken");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  //
  const onSubmit = handleSubmit((data) => {
    try {
      setloading(true);
      axios
        .post(`${BaseUrl}/api/vl/auth/login`, {
          email: data.email,
          password: data.password,
        })
        .then((data) => {
          setloading(false);
          cookie.set("userToken", data.data.token);
          console.log(data.data);
          window.location.href = "/";
        });
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  });
  //

  const linkStyle = (path: string) =>
    pathname === path
      ? "text-orange-600 font-bold border-b-2 border-orange-500"
      : "hover:text-orange-600";
  const linkStyleSmall = (path: string) =>
    pathname === path
      ? "text-orange-600 font-bold border-b-2 border-orange-500 w-full h-8"
      : "w-full h-8 hover:text-orange-600";
  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/vl/user/token`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      });
  }, []);
  const logout = () => {
    cookie.remove("userToken");
    window.location.href = "/";
  };
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ height: "80px" }}
          animate={{
            height: menu ? "auto" : "80px",
            paddingTop: menu ? "20px" : "0",
          }}
          exit={{ height: "80px" }}
          transition={{ duration: 0.3 }}
          className="w-full min-h-20 border-1 border-gray-200 bg-white flex items-center justify-evenly flex-wrap overflow-hidden"
        >
          <img
            className="h-10 w-40"
            src="https://themewagon.github.io/famms/images/logo.png"
            alt="LOGO"
          />

          <div className="flex max-sm:hidden justify-center gap-5 items-center font-bold">
            <Link className={linkStyle("/")} href="/">
              HOME
            </Link>
            <Link className={linkStyle("/about")} href="/about">
              ABOUT
            </Link>
            <Link className={linkStyle("/product")} href="/product">
              PRODUCTS
            </Link>
            <Link className={linkStyle("/blog")} href="/blog">
              BLOG
            </Link>
          </div>

          <div className="flex justify-center items-center gap-5 text-xl">
            <span className="hover:text-orange-600 cursor-pointer">
              <FaCartShopping />
            </span>
            <span className="hover:text-orange-600 cursor-pointer">
              <FaSearch />
            </span>
            <span
              onClick={() => setUserMenu(!userMenu)}
              className="hover:text-orange-600 cursor-pointer"
            >
              <FaCircleUser />
            </span>
            {menu ? (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setMenu(!menu)}
                className="hover:text-orange-600 cursor-pointer hidden max-sm:block"
              >
                <AiOutlineClose />
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenu(!menu)}
                className="hover:text-orange-600 cursor-pointer hidden max-sm:block"
              >
                <CiMenuFries />
              </motion.span>
            )}
          </div>

          {menu && (
            <div className=" min-h-40 w-full my-5 bg-white flex justify-center items-center flex-wrap px-15 top-18 left-0  text-center">
              <Link className={linkStyleSmall("/")} href="/">
                HOME
              </Link>
              <Link className={linkStyleSmall("/about")} href="/about">
                ABOUT
              </Link>
              <Link className={linkStyleSmall("/product")} href="/product">
                PRODUCTS
              </Link>
              <Link className={linkStyleSmall("/blog")} href="/blog">
                BLOG
              </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {userMenu && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed h-full w-96 max-md:w-72 border-1 z-10 top-0 right-0 border-gray-200 bg-white"
          >
            {/*  */}
            {token ? (
              <>
                <div className="w-full p-7 flex justify-between">
                  <h1 className=" ">Hello: {user?.name}👋</h1>
                  <div
                    className="text-2xl cursor-pointer text-orange-500"
                    onClick={() => setUserMenu(!userMenu)}
                  >
                    <AiOutlineClose />
                  </div>
                </div>
                {user && (
                  <div className="w-full h-auto flex flex-wrap justify-center ">
                    <div className=" w-[95%] h-22 px-5 rounded-xl border-1 border-gray-200 shadow-sm flex   items-center gap-3">
                      <img
                        className="w-15 h-auto rounded-full"
                        src={user.image.url}
                        alt={user.name}
                      />
                      <h1 className="text-xl">{user.name}</h1>
                    </div>
                    {/*  */}
                    <div className=" w-[95%] hover:bg-gray-300 cursor-pointer duration-300 h-12 my-2 mt-5 px-5 rounded-xl justify-between   flex   items-center gap-3">
                      <div className="text-2xl flex gap-5 items-center">
                        <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                          <FaCircleUser />
                        </span>
                        <h1 className="text-xl">View all data</h1>
                      </div>
                      <div className="text-xl">
                        <IoIosArrowForward />
                      </div>
                    </div>
                    {/*  */}
                    <div className=" w-[95%] h-12 cursor-pointer hover:bg-gray-300 duration-300 px-5 rounded-xl justify-between   flex   items-center gap-3">
                      <div className="text-2xl flex gap-5 items-center">
                        <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                          <IoMdSettings />
                        </span>
                        <h1 className="text-xl">Setting</h1>
                      </div>
                      <div className="text-xl">
                        <IoIosArrowForward />
                      </div>
                    </div>
                    {/*  */}
                    {user.isAdmin && (
                      <div className=" w-[95%] flex-wrap h-12 cursor-pointer hover:bg-gray-300 duration-300 px-5 rounded-xl justify-between   flex   items-center gap-3">
                        <div className="text-2xl flex gap-5 items-center">
                          <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                            <MdAdminPanelSettings />
                          </span>
                          <h1 className="text-xl">Admin</h1>
                        </div>
                        <div
                          onClick={() => setAdminMenu(!adminMenu)}
                          className="text-xl"
                        >
                          <IoMdArrowDropdown />
                        </div>
                      </div>
                    )}
                    <AnimatePresence>
                      {adminMenu && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-[95%] my-5 flex flex-wrap max-md:px-10 px-20 justify-center min-h-20 "
                        >
                           {/*  */}
                           <Link
                            href="/usermangement"
                            className="text-2xl my-3 flex gap-5 items-center"
                          >
                            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                              <BiUser />
                            </span>
                            <h1 className="text-xl"> Users</h1>
                          </Link>
                          {/*  */}
                          <Link
                            href=""
                            className="text-2xl my-3 flex gap-5 items-center"
                          >
                            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                              <BiCategory />
                            </span>
                            <h1 className="text-xl">Category</h1>
                          </Link>
                         
                          {/*  */}
                          <Link
                            href="/adminproduct"
                            className="text-2xl flex gap-5 items-center"
                          >
                            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                              <MdOutlineStoreMallDirectory />
                            </span>
                            <h1 className="text-xl">Orders Trader</h1>
                          </Link>
                          {/*here  */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/*  */}
                    {user.isTrader && (
                      <div className=" w-[95%] flex-wrap h-12 cursor-pointer hover:bg-gray-300 duration-300 px-5 rounded-xl justify-between   flex   items-center gap-3">
                        <div className="text-2xl flex gap-5 items-center">
                          <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                            <MdAdminPanelSettings />
                          </span>
                          <h1 className="text-xl">Trader</h1>
                        </div>
                        <div
                          onClick={() => setTraderMenu(!traderMenu)}
                          className="text-xl"
                        >
                          <IoMdArrowDropdown />
                        </div>
                      </div>
                    )}
                    <AnimatePresence>
                      {traderMenu && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-[95%] my-5 flex flex-wrap max-md:px-10 px-20 justify-center min-h-20 "
                        >
                          {/*  */}
                          <Link
                            href="/addproduct"
                            className="text-2xl flex gap-5 items-center"
                          >
                            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                              <MdOutlineStoreMallDirectory />
                            </span>
                            <h1 className="text-xl">Add Product</h1>
                          </Link>
                          {/*  */}
                          <Link
                            href="/addcategory"
                            className="text-2xl my-3 flex gap-5 items-center"
                          >
                            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                              <BiCategory />
                            </span>
                            <h1 className="text-xl">Add Category</h1>
                          </Link>
                          {/*  */}
                          <Link
                            href="/productmangement"
                            className="text-2xl my-3 flex gap-5 items-center"
                          >
                            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                              <CgProductHunt />
                            </span>
                            <h1 className="text-xl"> All Product</h1>
                          </Link>
                          {/*  */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/*  */}
                    <div
                      onClick={() => logout()}
                      className=" w-[95%] h-12 cursor-pointer hover:bg-red-300 duration-300 px-5 rounded-xl justify-between   flex   items-center gap-3"
                    >
                      <div className="text-2xl flex gap-5 items-center">
                        <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200">
                          <CgLogOut />
                        </span>
                        <h1 className="text-xl">Log Out</h1>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                )}
              </>
            ) : (
              <>
                {" "}
                <div className="w-full p-7 flex justify-between">
                  <h1 className="text-2xl ">LOG IN</h1>
                  <div
                    className="text-2xl"
                    onClick={() => setUserMenu(!userMenu)}
                  >
                    <AiOutlineClose />
                  </div>
                </div>
                <form
                  onSubmit={onSubmit}
                  className="flex justify-center flex-wrap px-5"
                >
                  <input
                    className="w-full h-12 border-gray-500 mt-7 px-5 border-1 "
                    {...register("email")}
                    type="email"
                    placeholder="enter your email..."
                  />
                  <input
                    className="w-full h-12 border-gray-500 mt-7 px-5 border-1 "
                    {...register("password")}
                    type="password"
                    placeholder="enter your password..."
                  />
                  <button
                    type="submit"
                    className="w-full  h-12 bg-orange-400 my-10 text-white"
                  >
                    {loading ? "Loading..." : "Log In"}
                  </button>
                  <p>
                    Not a member?{" "}
                    <Link className="text-orange-400" href="/register">
                      Register
                    </Link>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
