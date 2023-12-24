import PropTypes from 'prop-types';

export const CustomButton = ({children, onClick,rounded,outlined,color, align,...rest})=>{
    const solidColorStyles = {
        primary:{bg:'bg-slate-700',bgHover:'hover:bg-slate-600'},
        secondary:{bg:'bg-blue-950',bgHover:'hover:bg-blue-900'},
        success:{bg:'bg-green-950',bgHover:'hover:bg-green-900'},
        danger:{bg:'bg-red-950',bgHover:'hover:bg-red-900'},
        warning:{bg:'bg-yellow-700',bgHover:'hover:bg-yellow-600'},
    }
    const outlinedColorStyles = {
        primary:{text:'text-slate-700',border:'border-slate-700',bgHover:'hover:bg-slate-700'},
        secondary:{text:'text-blue-950',border:'border-blue-950',bgHover:'hover:bg-blue-950'},
        success:{text:'text-green-950',border:'border-green-950',bgHover:'hover:bg-green-950'},
        danger:{text:'text-red-950',border:'border-red-950',bgHover:'hover:bg-red-950'},
        warning:{text:'text-yellow-700',border:'border-yellow-700',bgHover:'hover:bg-yellow-700'},
    }
    const textAlign = {
        start:'text-start',
        center:'text-center',
        end:'text-end'
    }
    const buttonClasses = ` duration-150 ease-in w-full ${textAlign[align]}
    ${rounded? 'rounded-lg' : null} 
    ${outlined? `border-2 ${outlinedColorStyles[color].text}
    ${outlinedColorStyles[color].border} 
    ${outlinedColorStyles[color].bgHover} hover:text-white`
     : `${solidColorStyles[color].bg}
     ${solidColorStyles[color].bgHover} text-white`} 
     shadow-lg font-semibold py-2 px-4`;
    return(
        <button {...rest} onClick={onClick} className={rest.className + buttonClasses}>
            {children}
        </button>
    );
}

CustomButton.defaultProps = {
    align:'center',
    rounded:true,
    outlined:false,
    color:'primary'
}

CustomButton.propTypes ={
    onClick:PropTypes.func.isRequired,
    rounded:PropTypes.bool,
    outlined:PropTypes.bool,
    color:PropTypes.string,
    align:PropTypes.string      
}