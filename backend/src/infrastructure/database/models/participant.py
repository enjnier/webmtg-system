from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, MappedAsDataclass, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from . import MeetingSchedule, User


class Role(str, Enum):
    """
    参加者の役割を定義する列挙型

    - 会議における参加者の権限レベルを表します
    """

    owner = "owner"  # 会議のオーナー（最高権限）
    admin = "admin"  # 会議の管理者
    member = "member"  # 一般メンバー
    guest = "guest"  # ゲスト（限定的な権限）


class Participant(MappedAsDataclass, Base):
    """
    参加者モデル

    - ユーザーと会議スケジュールの多対多関連を管理します
    - 各参加者のミーティングにおける役割も保持します
    """

    __tablename__ = "participants"
    __table_args__ = (
        UniqueConstraint(
            "user_id", "meeting_schedule_id", name="unique_user_meeting_schedule"
        ),
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    """参加ユーザーのID（外部キー）"""

    meeting_schedule_id: Mapped[int] = mapped_column(
        ForeignKey("meeting_schedule.id"), nullable=False
    )
    """参加する会議スケジュールのID（外部キー）"""

    user: Mapped[User] = relationship(back_populates="participants", init=False)
    """参加者のユーザー情報への参照"""

    meeting_schedule: Mapped[MeetingSchedule] = relationship(
        back_populates="participants", init=False
    )
    """参加する会議スケジュールへの参照"""

    role: Mapped[Role] = mapped_column(default=Role.member)
    """参加者の会議における役割（デフォルトはメンバー）"""
