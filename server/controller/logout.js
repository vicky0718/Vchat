async function logout(request, response){
    try {
        const cookieOptions = {
            http: true,
            secure: true
        }
        return response.cookie('token','',cookieOptions).status(200).json({
            messsge: "session logged out",
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            messsge: error.message || error,
            error: true
        })
    }
}

module.exports = logout 