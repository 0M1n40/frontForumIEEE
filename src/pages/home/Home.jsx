import ListaDuvidas from "../../components/duvidas/ListaDuvida";

function Home() {
    return (
        <>
            <div className="container bg-[#002852]">
                {/* ajeitar esse kct de banner  */}
                <img src="https://ik.imagekit.io/minayura/bannerSite.png?updatedAt=1749201262547" alt="Logo do site" className="  mx-auto w-auto h-150 items-center" />
            </div>
            <ListaDuvidas />
        </>
    )
}

export default Home;