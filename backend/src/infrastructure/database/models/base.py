from datetime import datetime

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    """
    全モデルの基底クラス

    共通の属性とメソッドを提供します：
    - id: 主キー
    - created_at: レコード作成日時
    - updated_at: レコード更新日時
    - deleted_at: レコード削除日時（ソフトデリート用）
    - to_dict: モデルをディクショナリに変換するメソッド
    """

    id: Mapped[int] = mapped_column(primary_key=True, index=True, init=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), init=False)
    updated_at: Mapped[datetime] = mapped_column(
        default=func.now(), onupdate=func.now(), init=False
    )
    deleted_at: Mapped[datetime | None] = mapped_column(default=None, init=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def soft_delete(self):
        self.deleted_at = func.now()

    def restore(self):
        self.deleted_at = None

    @property
    def is_deleted(self) -> bool:
        return self.deleted_at is not None
