
module.exports = {
    overlayStyles: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    dialogStyles: {
        width: '50%',
        height: '400px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-200px',
        marginLeft: '-25%',
        backgroundColor: '#fff',
        borderRadius: '2px',
        zIndex: 100,
        padding: '10px',
        boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
    },
    closeButtonStyle: {
        cursor: 'pointer',
        float: 'right',
        fontSize: '1.6em',
        margin: '-15px 0'
    }
};