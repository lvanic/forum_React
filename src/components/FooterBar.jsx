import '../css/footer.css'

function FooterBar() {
    return (
        <footer className="footerForum">
            <div className='footerForumText' style={{ color: 'white', textDecoration: 'underline', fontSize: '20px', width: '20%', marginLeft: '4%', marginTop: '20px' }}>Условия использования и конфедициальности</div>
            <img className='footerForumImage' src="../img/logo.png" />
        </footer>
    );
}

export default FooterBar;