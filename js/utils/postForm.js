import { setBackgroundImage, setFiledValue } from "./common";

function setFormValues(form, formValues) {
    setFiledValue(form, '[name="title"]', formValues?.title);
    setFiledValue(form, '[name="author"]', formValues?.author);
    setFiledValue(form, '[name="description"]', formValues?.description);

    setFiledValue(form, '[name="imageUrl"]', formValues?.imageUrl); //hidden field
    setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl);

}

function getFormValues(form) {
    const formValues = {};

    //Option 1: query each value in the form input
    // ['title', 'author', 'description', 'imageUrl'].forEach(name => {
    //     const field = form.querySelector(`[name="${name}"]`);
    //     if (field) formValues[name] = field.value;
    // })

    //Option 2: using new FormData
    const data = new FormData(form);
    for (const [key, value] of data) {
        formValues[key] = value;
    }

    return formValues;
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
    const form = document.getElementById(formId);
    if (!form) return;

    setFormValues(form, defaultValues);

    form.addEventListener('submit',(event) => {
        event.preventDefault();

        //get form values
        const formValues = getFormValues(form);
        console.log(formValues);

        //validation 
        //if valid trigger submit callback
        //otherwise, show error message
    });
}