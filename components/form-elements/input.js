export function Input({ id=undefined, type="text", placeholder="", refEl=undefined, label=undefined, onChangeEvent=undefined, addlClass="", children=undefined }) {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="label">{label}</label>}
      <div className="control">
        <input
          id={id}
          placeholder={placeholder}
          className="input"
          type={type}
          ref={refEl}
          onChange={onChangeEvent}
        ></input>
      </div>
      {children}
    </div>
  )
}
