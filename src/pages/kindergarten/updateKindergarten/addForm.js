export const AddForm = (setForms, formRefs, setBranchFormDataArray) => {
    setForms((prevForms) => {
      const newForms = [...prevForms, prevForms.length];
      setBranchFormDataArray((prevData) => [
        ...prevData,
        {
          branch_name: "",
          location: "",
          phone_number: "",
          branch_admin_username: "",
          branch_admin_password: "",
          kindergarden_id: "",
        },
      ]);
      setTimeout(() => {
        const newFormRef = formRefs.current[prevForms.length];
        if (newFormRef) {
          newFormRef.scrollIntoView({ behavior: "smooth" });
          const firstInput = newFormRef.querySelector("input");
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 100);
      return newForms;
    });
  };