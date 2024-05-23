
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Radio,
//   Typography,
// } from "@mui/material";
// import clsx from "clsx";
// import React, {
//   Ref,
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useState,
// } from "react";
// import { useRouter } from "next/router";
// import { WithdrawModalProps, WithdrawalModalRef } from "./types";
// import { Spinner } from "../Spinner";
// import { useDialog } from "@common/context";
// import {
//   useGetSuperSaveWithdrawForm,
//   useGetSuperUserDetail,
//   useSetSuperSaveWithdrawForm,
//   useSetWithdrawUserAsAdmin,
// } from "api/hooks";
// import { LocalKeys, useLocale } from "locale";
// import { DataRow } from "../DataRow";
// import { htmlIds } from "@cypress/utils/ids";
// import { toast } from "react-toastify";
// import { queryClient } from "api";

// function WithdrawalModal(
//   { email: _email, onSave }: WithdrawModalProps,
//   ref: Ref<WithdrawalModalRef>,
// ) {
//   const [direct, setDirect] = useState(false);
//   const { text } = useLocale();
//   const router = useRouter();
//   const email = (router.query.email || _email) as string;
//   const { data, isFetching, isRefetching, refetch } =
//     useGetSuperSaveWithdrawForm(
//       {
//         email,
//       },
//       {
//         enabled: !!email,
//       },
//     );

//   const withdrawFormDetail = data?.data;

//   const [reason, setReason] = useState<string | undefined>();
//   const [error, setError] = useState<boolean>(false);
//   const { data: user_details } = useGetSuperUserDetail({ email });
//   const { mutateAsync: updateWithdrawalStatus, isLoading } =
//     useSetSuperSaveWithdrawForm();
//   const {
//     mutateAsync: setWithdrawalUserAsAdmin,
//     isLoading: withdrawalUserAsAdminLoading,
//   } = useSetWithdrawUserAsAdmin();

//   const [open, setOpen] = useState(false);
//   const { confirmDialog, alertDialog } = useDialog();

//   useEffect(() => {
//     if (withdrawFormDetail) {
//       if (!reasons.some((r) => r.value === reason)) setDirect(true);
//       setReason(withdrawFormDetail?.reason);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [withdrawFormDetail]);

//   const reasons = [
//     {
//       value: "Not using the app",
//       label: "user_withdrawal_reason_1",
//     },
//     {
//       value: "Inconvenient to use due to errors",
//       label: "user_withdrawal_reason_2",
//     },
//     {
//       value: "Difficult to use",
//       label: "user_withdrawal_reason_3",
//     },
//   ];

//   useImperativeHandle(
//     ref,
//     () => ({
//       open: () => setOpen(true),
//     }),
//     [],
//   );

//   const onClose = () => {
//     if (isRefetching || isLoading || withdrawalUserAsAdminLoading) {
//       return;
//     }

//     setOpen(false);
//     onSave && onSave();
//   };

//   const handleWithdrawUserAsAdmin = () => {
//     if (reason) {
//       if (user_details?.member_status !== 0) {
//         if (data) {
//           updateWithdrawalStatus({
//             withdraw_request_id: data?.data?.withdraw_request_id,
//           })
//             .then((res) => {
//               alertDialog({
//                 title:
//                   res?.data?.message || text("user_withdrawal_saved_error"),
//                 onOk: async () => {
//                   router.push("/users");
//                   setOpen(false);
//                 },
//               });
//             })
//             .catch((err) => {
//               toast.error(err?.response?.data?.message);
//               setOpen(false);
//             })
//             .finally(() => {
//               onSave && onSave();
//             });
//         }
//       } else {
//         setWithdrawalUserAsAdmin({
//           reason: reason,
//           description: withdrawFormDetail?.description || "",
//           amount: withdrawFormDetail?.amount || 0,
//           bank_name: withdrawFormDetail?.bank_name || "",
//           bank_account_number: withdrawFormDetail?.bank_account_number || "",
//           email: withdrawFormDetail?.email || "",
//           wallet_type: withdrawFormDetail?.wallet_type || "",
//           wallet_id: withdrawFormDetail?.wallet_id || "",
//           amount_usdt: withdrawFormDetail?.amount_usdt || 0,
//         })
//           .then(() => {
//             refetch().then((res) => {
//               if (res.data) {
//                 updateWithdrawalStatus({
//                   withdraw_request_id: res.data.data.withdraw_request_id,
//                 })
//                   .then((res) => {
//                     alertDialog({
//                       title:
//                         res?.data?.message ||
//                         text("user_withdrawal_saved_error"),
//                       onOk: async () => {
//                         router.push("/users");
//                         setOpen(false);
//                       },
//                     });
//                   })
//                   .catch((err) => {
//                     toast.error(err?.response?.data?.message);
//                     setOpen(false);
//                   })
//                   .finally(() => {
//                     // queryClient.invalidateQueries(["super-user-details", email]);
//                     onSave && onSave();
//                   });
//               }
//             });
//           })
//           .catch((err) => {
//             toast.error(err?.response?.data?.message);
//           });
//       }
//     }
//   };

//   const onWithdrawal = () => {
//     // if withdrawal completed
//     if (user_details?.member_status === 2) {
//       setOpen(false);
//     }

//     // if not withdrawal request and reason is not set
//     else if ((!withdrawFormDetail?.reason && !reason) || reason?.length === 0) {
//       setError(true);
//     } else {
//       confirmDialog({
//         title: withdrawFormDetail?.name || "",
//         content: text("user_withdrawal_confirmation"),
//         onOk: async () => handleWithdrawUserAsAdmin(),
//       });
//     }
//   };

//   return (

    
//     <Dialog
//       id={htmlIds.div_withdrawal_modal_container}
//       maxWidth="md"
//       open={open}
//       onClose={onClose}
//     >
//       {isFetching && !isRefetching ? (
//         <div className="m-12">
//           <Spinner size={8} />
//         </div>
//       ) : (
//         <>
//           <DialogTitle className="flex justify-between items-center">
//             <Typography>{text("user_withdrawal_title")}</Typography>
//             <button
//               className="flex items-start text-slate-400 h-8 w-8"
//               onClick={onClose}
//             >
//               <XMarkIcon className="h-8 w-8 p-1" />
//             </button>
//           </DialogTitle>
//           <DialogContent>
//             <div className="border border-1">
//               <DataRow
//                 label={text("user_withdrawal_user_name")}
//                 value={<p>{withdrawFormDetail?.name}</p>}
//               />
//               <DataRow
//                 label={text("user_withdrawal_user_id")}
//                 value={<p>{withdrawFormDetail?.user_id}</p>}
//               />
//               <DataRow
//                 label={text("user_withdrawal_email")}
//                 value={<p>{withdrawFormDetail?.email}</p>}
//               />
//               <DataRow
//                 labelConClassName={clsx(
//                   withdrawFormDetail?.amount
//                     ? "text-red-500 font-semibold"
//                     : "",
//                 )}
//                 label={
//                   text("user_withdrawal_cumulative_accounts_payable") + " (KRW)"
//                 }
//                 value={
//                   <p>
//                     {formatNumberWithCommas(withdrawFormDetail?.amount)}{" "}
//                     {text("deposit_information_krw_suffix")}
//                   </p>
//                 }
//               />
//               <DataRow
//                 label={text("user_withdrawal_deposit_amount")}
//                 value={
//                   <p>
//                     {withdrawFormDetail?.bank_name}{" "}
//                     {withdrawFormDetail?.bank_account_number}
//                   </p>
//                 }
//               />
//               <DataRow
//                 labelConClassName={clsx(
//                   withdrawFormDetail?.amount_usdt
//                     ? "text-red-500 font-semibold"
//                     : "",
//                 )}
//                 label={
//                   text("user_withdrawal_cumulative_accounts_payable") +
//                   " (USDT)"
//                 }
//                 value={
//                   formatNumberWithCommas(withdrawFormDetail?.amount_usdt) +
//                   " USDT"
//                 }
//               />
//               <DataRow
//                 label={text("user_withdrawal_deposit_wallet_id")}
//                 value={withdrawFormDetail?.wallet_id}
//               />
//               <DataRow
//                 labelConClassName="h-[250px] text-red-500 font-semibold"
//                 label={text("user_withdrawal_reasons")}
//                 value={
//                   <div>
//                     {reasons.map((_reason, index) => (
//                       <div
//                         key={_reason.value}
//                         onClick={() => {
//                           if (!withdrawFormDetail?.reason) {
//                             setError(false);
//                             setReason(_reason.value);
//                           }
//                         }}
//                       >
//                         <Radio
//                           id={
//                             htmlIds.radio_withdrawal_modal_reasons_option_ +
//                             index
//                           }
//                           disabled={!!withdrawFormDetail?.reason}
//                           checked={_reason.value === reason}
//                         />
//                         <label>{text(_reason.label as LocalKeys)}</label>
//                       </div>
//                     ))}
//                     <div
//                       onClick={() => {
//                         if (!withdrawFormDetail?.reason) {
//                           setError(false);
//                           setDirect(true);
//                           setReason("");
//                         }
//                       }}
//                     >
//                       <Radio
//                         id={
//                           htmlIds.radio_withdrawal_modal_reasons_option_ +
//                           reasons.length
//                         }
//                         disabled={!!withdrawFormDetail?.reason}
//                         checked={
//                           !reasons.some((r) => r.value === reason) && direct
//                         }
//                       />
//                       <label>{text("user_withdrawal_direct_input")}</label>
//                     </div>
//                     <textarea
//                       id={htmlIds.textarea_withdrawal_modal_custom_reason}
//                       disabled={
//                         !!withdrawFormDetail?.reason ||
//                         !(!reasons.some((r) => r.value === reason) && direct)
//                       }
//                       onChange={(e) => setReason(e.target.value)}
//                       value={
//                         withdrawFormDetail?.reason
//                           ? withdrawFormDetail?.reason
//                           : !reasons.some((r) => r.value === reason) && direct
//                           ? reason
//                           : ""
//                       }
//                       placeholder={text(
//                         "user_withdrawal_direct_input_placeholder",
//                       )}
//                       className="bg-slate-100 w-full border-slate-100"
//                     />
//                     {error && (
//                       <div className="text-xs mt-1 text-red-600">
//                         {text("user_withdrawal_reason_error")}
//                       </div>
//                     )}
//                   </div>
//                 }
//               />
//             </div>
//           </DialogContent>
//           <DialogActions className="flex justify-center">
//             {user_details?.member_status !== 2 && (
//               <button
//                 id={htmlIds.btn_withdrawal_modal_cancel}
//                 disabled={
//                   isRefetching || isLoading || withdrawalUserAsAdminLoading
//                 }
//                 className=" mr-1 rounded-md border border-transparent bg-slate-200 py-2 w-36 text-sm font-medium text-slate-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 onClick={onClose}
//               >
//                 {text("user_withdrawal_cancel")}
//               </button>
//             )}
//             <button
//               id={htmlIds.btn_withdrawal_modal_confirm}
//               onClick={onWithdrawal}
//               disabled={
//                 isRefetching || isLoading || withdrawalUserAsAdminLoading
//               }
//               className="ml-1 group rounded-md border border-transparent bg-blue-600 py-2 w-36 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               {isRefetching || isLoading || withdrawalUserAsAdminLoading ? (
//                 <Spinner />
//               ) : (
//                 text(
//                   user_details?.member_status === 2
//                     ? "user_withdrawal_check_btn"
//                     : "user_withdrawal_btn",
//                 )
//               )}
//             </button>
//           </DialogActions>
//         </>
//       )}
//     </Dialog>
//   );
// }

// export default forwardRef(WithdrawalModal);

// import { ReactNode } from "react";

// const DataRow = ({
//   label,
//   value,
//   labelConClassName,
//   valueConClassName,
// }: {
//   label: string;
//   value: ReactNode;
//   labelConClassName?: string;
//   valueConClassName?: string;
// }) => {
//   return (
//     <div className="flex">
//       <div
//         className={`h-[50px] px-[16px] flex items-center w-[240px] border-b-[1px] border-white bg-[#EEF0F4] ${labelConClassName}`}
//       >
//         <p>{label}</p>
//       </div>
//       <div
//         className={`flex-1 flex items-center gap-[12px] px-[20px] border-b-[1px] border-[#EEF0F4] ${valueConClassName}`}
//       >
//         {value}
//       </div>
//     </div>
//   );
// };

// export default DataRow;




