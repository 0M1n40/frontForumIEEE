const BotaoEntrar = ({ label = "" }) => {
    return (
      <button className=" mb-10  mt-10 w-full max-w-150 h-[55px] bg-[#2C3E50] rounded-[30px] text-[#EFEFEF] text-[23px] font-poppins font-normal text-center cursor-pointer hover:opacity-90">
        {label}
      </button>
    );
  };
  
  export default BotaoEntrar;
  