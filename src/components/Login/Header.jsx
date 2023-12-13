import logo from './../../assets/stylesquad-logo.png';

export const Header = ({headerHeight})=>{
    return (
    <div style={{height: headerHeight}} className={`header pb-8 flex justify-center items-end`}>
        <img src={logo} alt="style squad logo" />
      </div>
    )
}