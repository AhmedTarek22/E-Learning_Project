export default function ButtonComponent(props) {
  return (
    <button
      hidden={props.hidden}
      disabled= {props.disabled}
      onClick={props.onClick}
      className={`bg-[${props.bg}] w-${props.w} mt-${props.mt} px-4 py-1 text-[${props.colorText}]
      rounded border-2 border-[var(--colorOrange)] font-${props.fontText}`}
    >
      {props.nameBtn}
    </button>
  );
}
