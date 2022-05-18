main = () => {
    let quality_value

    let image_input = document.querySelector("#image_input")
    let quality = document.querySelector("#quality")

    let hidden_canvas = document.querySelector("#hidden_canvas")
    let hidden_ctx = hidden_canvas.getContext("2d")
    let hidden_canvas_data = null

    let hidden_image = new Image()

    let compress = document.querySelector("#compress")
    let reset = document.querySelector("#reset")

    let download_section = document.querySelector("#download")
    let link = document.querySelector("a")

    image_input.addEventListener("change", (e1) => {
        if(e1.target.files){
            let imageFile = e1.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(imageFile)
            reader.onload = (e2) => {
                hidden_image.src = e2.target.result

                hidden_image.onload = () => {
                    hidden_canvas.setAttribute("width", hidden_image.width)
                    hidden_canvas.setAttribute("height", hidden_image.height)
                    hidden_ctx.drawImage(hidden_image, 0, 0, hidden_canvas.width, hidden_canvas.height)
                    hidden_canvas_data = hidden_canvas.toDataURL()
                }
            }
        }
    })

    compress.addEventListener("click", () => {
        if (hidden_canvas_data === null){
            alert("Please Upload an Image First")
        }
        else{
            if (quality.value === ""){
                quality_value = 0.92
            }
            else if (Number(quality.value) <= 0 || Number(quality.value) >= 1){
                alert("Quality Value must be between 0 and 1")
            }
            else {
                quality_value = Number(quality.value)     
            }       

            link.setAttribute("target", "_blank")
            link.setAttribute("download", "image.jpg")
            link.setAttribute("href", hidden_canvas.toDataURL("image/jpeg", quality_value))
            download_section.hidden = false
        }
    })

    reset.addEventListener("click", () => {
        hidden_canvas_data = null
        hidden_image.src = ""
        image_input.value = ""
        quality.value = ""
        download_section.hidden = true
        link.value = ""
    })
}

main()