const Category = require('../models/Category')

//admin 
const createNewCategory = async (req, res) => {
    const img = (req.file?.filename ? req.file.filename : "")
    const { name, description } = req.body
    if (!name) {
        return res.status(400).json(
            {
                error: true,
                message: "name is required",
                data: null
            }
        )
    }
    const category = await Category.create({ name, img, description })
    if (!category) {
        return res.status(404).json(
            {
                error: true,
                message: "something wrong",
                data: null
            }
        )
    }
    res.status(201).json({
        error: false,
        message: "",
        data: category
    })

}

const updateCategory = async (req, res) => {
    const img = (req.file?.filename ? req.file.filename : "")

    const { id, name, description } = req.body
    if (!id || !name) {
        return res.status(400).json(
            {
                error: true,
                message: "id,name and img are required",
                data: null
            }
        )
    }
    const update = await Category.findById(id).exec()
    if (!update) {
        return res.status(404).json(
            {
                error: true,
                message: "something wrong",
                data: null
            }
        )
    }
    update.name = name
    if (img)
        update.img = img
    update.description = description
    const updated = await update.save()
    if (!updated) {
        return res.status(404).json(
            {
                error: true,
                message: "something wrong",
                data: null
            }
        )
    }

    res.status(201).json(
        {
            error: false,
            message: "",
            data: updated
        }
    )

}

const getCategoryes = async (req, res) => {
    const categoryes = await Category.find({ deleted: false }).sort({name:1}).lean()
    if (!categoryes) {
        return res.status(404).json(
            {
                error: true,
                message: "something wrong",
                data: null
            }
        )
    }

    res.status(201).json(
        {
            error: false,
            message: "",
            data: categoryes
        }
    )

}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            erroe: true,
            message: "id is required",
            data: null
        })
    }

    const category = await Category.findById(id).exec()
    if (!category) {
        return res.status(404).json({
            erroe: true,
            message: "something wrong",
            data: null
        })
    }


    category.deleted = true
    const deleted = await category.save()
    return res.status(201).json({
        erroe: false,
        message: "",
        data: deleted
    })
}

const getCategoryeById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            erroe: true,
            message: "id is required",
            data: null
        })
    }
    const category = await Category.findById(id).lean()
    if (!category) {
        return res.status(404).json({
            erroe: true,
            message: "something wrong",
            data: null
        })
    }

    return res.status(201).json({
        erroe: false,
        message: "",
        data: category
    })

}
module.exports = { createNewCategory, updateCategory, getCategoryes, deleteCategory, getCategoryeById }