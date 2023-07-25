const { User, Category, Post, Tag, sequelize } = require("../models");
const { comparePassword } = require ("../helpers/bcryptHelper");
const { signToken } = require("../helpers/jwtHelper");

class Controller {
    static async registerAdmin(req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body;
            const newAdmin = await User.create({
                username, email, password, role: "admin", phoneNumber, address
            })
            res.status(201).json({message: `User #${newAdmin.id} with username ${newAdmin.username} registration success`})
        } catch (err) {
            next(err)
        }
    }

    static async loginAdmin(req, res, next) {
        try {
            const {email, password} = req.body;
            if (!email) throw {name: "NullEmail"};
            if (!password) throw {name: "NullPassword"};

            const targetUser = await User.findOne({where: {email}});
            if (!targetUser) throw {name: "InvalidEmailPassword"};
            const isPasswordMatch = comparePassword(password, targetUser.password);
            if (!isPasswordMatch) throw {name: "InvalidEmailPassword"};
            const isAdmin = targetUser.role === 'admin';
            if (!isAdmin) throw {name: "InvalidEmailPassword"}
            
            const access_token = signToken({
                id: targetUser.id,
                username: targetUser.username
            })

            res.status(200).json({access_token})
        } catch (err) {
            next(err)
        }
    }

    static async readPosts(req, res, next) {
        try {
            const data = await Post.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: User,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Category,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Tag,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }
                ]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addPost(req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            const {title, content, imgUrl, categoryId, tags} = req.body
            const authorId = req.user ? req.user.id : 1
            const authorMongoId = req.user ? null : "64ba12500ddfb4093a526959"
            console.log(req.body)
            let slug = ""
            if (title) {
                slug = title.split(" ").join("-")
            }

            const newPost = await Post.create({title, slug, content, imgUrl, categoryId, authorId, authorMongoId}, {transaction})
            if (tags) {
                const tagsToCreate = tags.map(e => {
                    return {
                        name: e,
                        postId: newPost.id
                    }
                })
                
                await Tag.bulkCreate(tagsToCreate, {transaction})
            }

            const successMsg = `New post #${newPost.id} with title '${newPost.title.substring(0, 12)}'... added`

            await transaction.commit()
            res.status(201).json({message: successMsg})
        } catch (err) {
            await transaction.rollback()
            next(err)
        }
    }

    static async readPostById(req, res, next) {
        try {
            const {id} = req.params;
            const data = await Post.findByPk(id, {
                include: [Tag, User, Category]
            });
            if (!data) throw {name: "NotFound"};

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async editPost(req, res, next) {
        try {
            const {id} = req.params;
            const {title, content, imgUrl, categoryId, tags} = req.body
            const data = await Post.findByPk(id);

            if (!data) throw {name: "NotFound"};
            
            let slug = ""
            if (title) {
                slug = title.split(" ").join("-")
            }

            await data.update({title, slug, content, imgUrl, categoryId});
            
            if (tags) {
                await Tag.destroy({where: {
                    postId: id
                }})
                const tagsObj = tags.map(e => {
                    return {
                        postId: id,
                        name: e
                    }
                })
                await Tag.bulkCreate(tagsObj)
            }

            res.status(200).json({message: `Post #${id} updated`});
        } catch (err) {
            next(err)
        }
    }

    static async deletePost(req, res, next) {
        try {
            const {id} = req.params;
            const data = await Post.findByPk(id);
            if (!data) throw {name: "NotFound"};

            await data.destroy();

            res.status(200).json({message: `Post #${id} deleted`});
        } catch (err) {
            next(err)
        }
    }

    static async readCategories(req, res, next) {
        try {
            const data = await Category.findAll({
                order: [["id", "ASC"]]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addCategory(req, res, next) {
        try {
            const { name } = req.body;
            const newCategory = await Category.create({name});
            res.status(201).json({message: `New category #${newCategory.id} added`})
        } catch (err) {
            next(err)
        }
    }

    static async readCategoryById(req, res, next) {
        try {
            const { id } = req.params
            const data = await Category.findByPk(id)
            if (!data) throw {name: "NotFound"}
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async editCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            console.log(name)
            console.log({name})
            const data = await Category.findByPk(id);
            if (!data) throw {name: "NotFound"};

            await data.update({ name })

            res.status(200).json({message: `Category #${id} updated`})
        } catch (err) {
            next(err)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Category.findByPk(id);
            if (!data) throw {name: "NotFound"};
            data.destroy();
            res.status(200).json({message: `Category #${id} deleted`})
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller