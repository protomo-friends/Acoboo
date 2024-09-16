package impl

import (
	"github.com/labstack/echo/v4"
	"github.com/protomo-friends/Acoboo/models"
)

// 口座の一覧を取得します
// (GET /accounts)
func (m ServerImpl) GetAccounts(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// 新しい口座を登録します
// (POST /accounts)
func (m ServerImpl) AddAccount(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// Deletes a account
// (DELETE /accounts/{id})
func (m ServerImpl) DeleteAccount(ctx echo.Context, id int64) error {
	panic("not implemented") // TODO: Implement
}

// Find account by ID
// (GET /accounts/{id})
func (m ServerImpl) GetAccountById(ctx echo.Context, id int64) error {
	panic("not implemented") // TODO: Implement
}

// Updates a accounts in the store with form data
// (POST /accounts/{id})
func (m ServerImpl) UpdateAccount(ctx echo.Context, id int64, params models.UpdateAccountParams) error {
	panic("not implemented") // TODO: Implement
}

// カテゴリーの一覧を取得します
// (GET /categories)
func (m ServerImpl) GetCategories(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// 新しいカテゴリーを登録します
// (POST /categories)
func (m ServerImpl) AddCategory(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// Deletes a category
// (DELETE /categories/{id})
func (m ServerImpl) DeleteCategory(ctx echo.Context, id int64) error {
	panic("not implemented") // TODO: Implement
}

// Find cateogry by ID
// (GET /categories/{id})
func (m ServerImpl) GetCategoryById(ctx echo.Context, id int64) error {
	panic("not implemented") // TODO: Implement
}

// Updates a category in the store with form data
// (POST /categories/{id})
func (m ServerImpl) UpdateCategory(ctx echo.Context, id int64, params models.UpdateCategoryParams) error {
	panic("not implemented") // TODO: Implement
}

// 収入/支出の一覧を取得します
// (GET /monetary-events)
func (m ServerImpl) GetMonetaryEvents(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// 新しい収入/支出を登録します
// (POST /monetary-events)
func (m ServerImpl) AddMonetaryEvent(ctx echo.Context) error {
	panic("not implemented") // TODO: Implement
}

// Deletes a monetary event
// (DELETE /monetary-events/{id})
func (m ServerImpl) DeleteMonetaryEvent(ctx echo.Context, id int64) error {
	panic("not implemented") // TODO: Implement
}

// Find monetary event by ID
// (GET /monetary-events/{id})
func (m ServerImpl) GetMonetaryEventById(ctx echo.Context, id int64) error {
	panic("not implemented") // TODO: Implement
}

// Updates a monetary events in the store with form data
// (POST /monetary-events/{id})
func (m ServerImpl) UpdateMonetaryEvent(ctx echo.Context, id int64, params models.UpdateMonetaryEventParams) error {
	panic("not implemented") // TODO: Implement
}
