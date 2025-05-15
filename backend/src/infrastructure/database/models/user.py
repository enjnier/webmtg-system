from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, MappedAsDataclass, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from . import Participant


class User(MappedAsDataclass, Base):
    """
    ユーザーモデル

    - システムにアクセスするユーザーの情報を管理します
    - 認証情報、個人情報、および参加している会議への関連を保持します
    """

    __tablename__ = "users"

    password: Mapped[str] = mapped_column(String(128))
    """ユーザーのハッシュ化されたパスワード"""

    user_name: Mapped[str] = mapped_column(String(50), unique=True)
    """ユーザーのログイン名（一意）"""

    first_name: Mapped[str | None] = mapped_column(String(50))
    """ユーザーの名"""

    last_name: Mapped[str | None] = mapped_column(String(50))
    """ユーザーの姓"""

    email: Mapped[str | None] = mapped_column(String(254), unique=True)
    """ユーザーのメールアドレス（一意）"""

    avatar: Mapped[str | None] = mapped_column(String(200))
    """ユーザーのアバター画像のパスまたはURL"""

    participants: Mapped[list[Participant]] = relationship(
        back_populates="user", init=False
    )
    """このユーザーが参加している会議の参加者情報のリスト"""
