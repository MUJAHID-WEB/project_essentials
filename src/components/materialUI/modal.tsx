// import CustomDialog from "@common/components/CustomDialog";
// import FormFooter from "@common/components/FormFooter";
// import TextFieldInput from "@common/components/FormInputs/TextField";
// import { requiredStringValidator } from "@common/utils/validationSchemas";
// import { htmlIds } from "@cypress/utils/ids";
// import { Box } from "@mui/material";
// import { TXIDModalType } from "@sections/super-save/deposit-information/components/TXIDModal/types";
// import {
//   IPostDepositTransactionIDRsq,
//   usePostDepositTransactionID,
// } from "api/hooks";
// import { Form, Formik } from "formik";
// import { useLocale } from "locale";
// import React from "react";
// import { toast } from "react-toastify";
// import * as Yup from "yup";

// const TXIDModal: React.FC<{
//   open: boolean;
//   type: string;
//   onClose: () => void;
//   tXIDModal: TXIDModalType;
//   refetchDeposit: () => void;
// }> = ({ open, onClose: _onClose, tXIDModal, refetchDeposit }) => {
//   const { text } = useLocale();

//   function validationSchema() {
//     return Yup.object().shape(
//       requiredStringValidator(["amount"], text("form_error_required")),
//     );
//   }

//   const { mutateAsync: createDepositTransaction, isLoading } =
//     usePostDepositTransactionID();

//   const onClose = () => {
//     _onClose();
//   };

//   const handleSubmit = (val: any) => {
//     const formData: IPostDepositTransactionIDRsq = {
//       request_id: tXIDModal.requestId,
//     };
//     formData[tXIDModal.name] = val.amount;
//     createDepositTransaction(formData)
//       .then((res) => {
//         toast(res?.data?.result || "Success", {
//           type: "success",
//         });
//         refetchDeposit();
//         onClose();
//       })
//       .catch((err) => {
//         toast(
//           err?.response?.data?.result ||
//             err?.response?.data?.message ||
//             "Error",
//           {
//             type: "error",
//           },
//         );
//       });
//   };

//   return (
//     <CustomDialog
//       open={open}
//       onClose={onClose}
//       titleText={
//         text("deposit_information_txid_title")
//       }
//     >
//       <Formik
//         onSubmit={(val) => handleSubmit(val)}
//         initialValues={{ amount: "" }}
//         validationSchema={validationSchema()}
//       >
//         {({ touched, errors, getFieldProps }) => {
//           function getLabelNplaceholder() {
//             return text("deposit_information_txid_enter");
//           }

//           return (
//             <Form>
//               <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
//                 <TextFieldInput
//                   error={touched.amount && Boolean(errors.amount)}
//                   helperText={touched.amount && errors.amount}
//                   id={htmlIds.input_deposit_information_txid}
//                   placeholder={getLabelNplaceholder()}
//                   label={getLabelNplaceholder()}
//                   {...getFieldProps("amount")}
//                 />

//                 <Box sx={{ display: "flex", columnGap: 2 }}>
//                   <FormFooter
//                     loading={isLoading}
//                     handleClose={onClose}
//                     submitText={text("deposit_information_txid_submit_button")}
//                     cancelText={text("deposit_information_txid_cancel_button")}
//                   />
//                 </Box>
//               </Box>
//             </Form>
//           );
//         }}
//       </Formik>
//     </CustomDialog>
//   );
// };

// export default TXIDModal;


// const CustomDialog = ({
//     titleText,
//     onClose,
//     open = false,
//     children,
//   }: PropsInterface) => {
//     return (
//       <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
//         <DialogTitle sx={{ pb: 0, pt: 3, pr: 2 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               items: "center",
//             }}
//           >
//             <h2 className="font-medium text-xl">{titleText}</h2>
//             <IconButton onClick={onClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
  
//         <DialogContent>
//           <Box sx={{ paddingY: 1 }}>{children}</Box>
//         </DialogContent>
//       </Dialog>
//     );
//   };
  
//   export default CustomDialog;



// const TextFieldInput = (props: TextFieldProps) => {
//     const { size: inputSize, variant, ...otherProps } = props;
  
//     const size = inputSize || "small";
  
//     return (
//       <FormControl fullWidth>
//         <TextField
//           fullWidth
//           size={size}
//           variant={variant || "outlined"}
//           InputLabelProps={{ size: "small" }}
//           sx={{
//             "& .MuiInputBase-input:focus": {
//               boxShadow: "none",
//             },
//             ".MuiInputLabel-root": {
//               top: 1,
//             },
//             ".MuiFormHelperText-root": {
//               marginLeft: 0.5
//             }
//           }}
//           inputProps={{
//             style: {
//               height: "28px",
//             },
//           }}
//           {...otherProps}
//         />
//       </FormControl>
//     );
//   };
  
//   export default TextFieldInput;
  


// type Interface = {
//     handleClose: (args: any) => void;
//     loading: boolean;
//     cancelText: string;
//     submitText: string;
//   };
  
//   const FormFooter = ({
//     handleClose,
//     loading = false,
//     cancelText,
//     submitText,
//   }: Interface) => {
//     return (
//       <>
//         <Button
//           onClick={handleClose}
//           variant="outlined"
//           type="reset"
//           size="large"
//           fullWidth
//         >
//           {cancelText}
//         </Button>
  
//         <ContainedMuiButton
//           disabled={loading}
//           disableElevation
//           type="submit"
//           fullWidth
//         >
//           {loading && <Spinner />}
//           {submitText}
//         </ContainedMuiButton>
//       </>
//     );
//   };
  
//   export default FormFooter;



// type AdditionalProps = {
//     children?: React.ReactNode;
//   };
  
//   type PropsInterface = ButtonProps & AdditionalProps;
  
//   const ContainedMuiButton = (props: PropsInterface) => {
//     const { children, size } = props;
  
//     return (
//       <Button
//         variant="contained"
//         size={size || "large"}
//         sx={{
//           backgroundColor: "#3b82f6 !important",
//           color: "#fff !important",
//         }}
//         {...props}
//       >
//         {children}
//       </Button>
//     );
//   };
  
//   export default ContainedMuiButton;
  