from __future__ import annotations

from datetime import datetime
from enum import Enum

from typing import TYPE_CHECKING
from uuid import UUID, uuid4
from zoneinfo import ZoneInfo

from .base import Base
from sqlalchemy import JSON, String, DateTime
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import Mapped, MappedAsDataclass, mapped_column, relationship

if TYPE_CHECKING:
    from . import Participant


def jst_now():
    """
    日本時間の現在時刻を返す

    Returns:
        datetime: 日本時間（Asia/Tokyo）のタイムゾーン付き現在時刻
    """
    return datetime.now(ZoneInfo("Asia/Tokyo"))


class Status(str, Enum):
    """会議の進行状況を表す列挙型"""

    ongoing = "ongoing"  # 進行中
    upcoming = "upcoming"  # 予定
    completed = "completed"  # 完了


class Priority(str, Enum):
    """会議の優先度を表す列挙型"""

    high = "high"  # 高優先度
    medium = "medium"  # 中優先度
    low = "low"  # 低優先度


class Repeat(str, Enum):
    """会議のスケジュールの繰り返しタイプを表す列挙型"""

    once = "once"  # 一度限り
    day = "day"  # 毎日
    week = "week"  # 毎週
    month = "month"  # 毎月
    year = "year"  # 毎年
    custom = "custom"  # カスタム設定


class MeetingSchedule(MappedAsDataclass, Base):
    """
    会議スケジュール

    - スケジューリングされたWeb会議を管理するテーブル
    - タイトル、日時、参加者、繰り返し設定などの会議に関する基本情報を保持
    """

    __tablename__ = "meeting_schedule"

    title: Mapped[str] = mapped_column(String(100), nullable=False)
    """会議のタイトル"""

    overview: Mapped[str | None] = mapped_column(String(500))
    """会議の概要"""

    priority: Mapped[Priority] = mapped_column(nullable=False)
    """会議の優先度"""

    repeat: Mapped[Repeat] = mapped_column(nullable=False)
    """会議の繰り返しパターン"""

    custom_repeat: Mapped[dict | None] = mapped_column(JSON)
    """カスタム繰り返し設定（repeatがcustomの場合に使用）"""

    participants: Mapped[list[Participant]] = relationship(
        back_populates="meeting_schedule", init=False
    )
    """会議の参加者リスト"""

    start_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=jst_now
    )
    """会議の開始日時"""

    end_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=jst_now
    )
    """会議の終了日時"""

    room_id: Mapped[UUID] = mapped_column(unique=True, nullable=False, default=uuid4())
    """会議ルームの一意識別子"""

    is_active: Mapped[bool] = mapped_column(default=True)
    """会議がアクティブかどうかを示すフラグ"""

    is_all_day: Mapped[bool] = mapped_column(default=False)
    """終日の会議かどうかを示すフラグ"""

    @property
    def status(self) -> Status:
        """
        会議スケジュールの現在の状態を取得する

        - 現在時刻と会議の開始・終了時刻を比較して状態を判定する

        Returns:
            Status: 会議スケジュールの状態（予定、進行中、完了のいずれか）
        """
        now = datetime.now(ZoneInfo("Asia/Tokyo"))

        if now < self.start_date:
            return Status.upcoming
        elif self.start_date <= now <= self.end_date:
            return Status.ongoing
        else:
            return Status.completed

    @classmethod
    def get_meetings_by_status(cls, session, status: Status):
        """
        指定された状態の会議スケジュールを検索する

        Args:
            session: SQLAlchemyのデータベースセッション
            status: 検索する会議スケジュールの状態

        Returns:
            list: 条件に合致する会議スケジュールのリスト
        """
        now = datetime.now(ZoneInfo("Asia/Tokyo"))

        if status == Status.upcoming:
            return session.query(cls).filter(cls.start_date > now).all()
        elif status == Status.ongoing:
            return (
                session.query(cls)
                .filter(cls.start_date <= now, cls.end_date >= now)
                .all()
            )
        elif status == Status.completed:
            return session.query(cls).filter(cls.end_date < now).all()

    @declared_attr
    def __mapper_args__(cls):
        """
        SQLAlchemyのマッパー引数を定義します

        Returns:
            dict: マッパー設定
        """
        return {"polymorphic_identity": cls.__name__, "concrete": True}
