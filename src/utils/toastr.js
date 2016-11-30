import 'toastr/build/toastr.css'
import toastr from 'toastr'

export default function(obj, type = 'success') {
    var content
    if (obj.content) {
        content = obj.content
        type = obj.type || type
    } else {
        content = obj
    }
    toastr[type](content)
}
